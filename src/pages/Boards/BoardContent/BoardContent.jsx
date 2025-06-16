import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  //closestCenter,
  pointerWithin,
  //rectIntersection,
  getFirstCollision

} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

function BoardContent({board}) {

  const pointerSensor = useSensor(PointerSensor, {activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, {activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, {activationConstraint: { delay: 250, tolerance: 5 } })
  
  //const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor)


  const [orderedColumns, setOrderedColumns] = useState([])
  // cung mot thoi diem chi co mot phan tu duoc keo tha (card hoac column)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Diem va cham cuoi cung(xu ly thuan toan phat hien va cham)
  const lastOverId = useRef(null)



  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card =>card._id)?.includes(cardId))
  }

  // Function chung xu ly Cap nhat lai state trong truong hop di chuyen Card giua cac column khac nhau
  const moveCardberweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCartId,
    activeDraggingCartData
    ) => {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOverCard = active.rect.current.translated && 
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverCard ? 1 : 0
        newCardIndex = overCardIndex >=0 ? overCardIndex + modifier : overColumn?.card?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn ) {
          
          //Xoa cac o column active 
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCartId)
          
          // Them Placeholder Card neu Column rong
          if (isEmpty(nextActiveColumn.cards)){
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          }
          
          // Cap nhat lai mang cardOrderIds  cho chuan du lieu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map (card => card._id)
        }
        if (nextOverColumn ) {
          // Kiem tra xem card dang keo no co ton tai o overColumn chua, neu co thi can phai xoa no truoc
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCartId)
          
          // Phai cap nhat lai chuan du lieu columnId trong card sau khi keo card giua 2 column khac nhau
          const rebuild_activeDraggingCartData = {
            ...activeDraggingCartData,
            columnId: nextOverColumn._id
          }
          // them cai card dang keo vao vi tri moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCartData)
        }

          //Xoa Placeholder Card di neu no dang ton tai
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

          // Cap nhat lai mang cardOrderIds  cho chuan du lieu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map (card => card._id)
        
        return nextColumns
      })
  }


  const handleDragStart = (event) => {
    //console.log('Drag Start:', event);

    // khi bat dau keo tha, lay id cua column hoac card duoc keo
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
    
  // trigger trong qua trinh keo mot phan tu
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //console.log('Drag Over:', event);
    const { active, over } = event

    // Kiem tra neu khong ton tai active hoac over (khi keo ra khoi pham vi) thi khong lam gi
    if(!active || !over) return

    const {id: activeDraggingCartId, data : { current : activeDraggingCartData}} = active
    const {id: overCardId} = over

    // Tim 2 cai column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCartId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardberweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCartId,
        activeDraggingCartData
      )
    }
  }

  const handleDragEnd = (event) => {
      // console.log('Drag End:', event);

      const { active, over } = event

    // kiem tra neu khong ton tai over 
    if(!active || !over) return
    
    // Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
        const {id: activeDraggingCartId, data : { current : activeDraggingCartData}} = active
        const {id: overCardId} = over

        // Tim 2 cai column theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCartId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        
        // Hanh dong keo tha card giua 2 column khac nhau
        if (oldColumnWhenDraggingCard._id !== overColumn._id) {
          moveCardberweenDifferentColumns(
            overColumn,
            overCardId,
            active,
            over,
            activeColumn,
            activeDraggingCartId,
            activeDraggingCartData
          )

            }else {
              //Hanh dong keo tha card trong cung mot column

              // lay vi tri cu cua column tu oldColumnWhenDraggingCard
              const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
              // lay vi tri moi cua column tu overColumn
              const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
              // dung arrayMove de sap xep lai mang Cards ban dau
              const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

              setOrderedColumns(prevColumns => {
                // clone mang orderedColumnsState cu ra mot cai moi de xu ly data 
                // roi return - Cap nhat lai orderedColumnsState moi
                const nextColumns = cloneDeep(prevColumns)

                // Tim toi Column dang tha
                  const targetColumn = nextColumns.find(column => column._id === overColumn._id)
                  
                  // cap nhat lai 2 gia tri moi la card va cardOrderIds trong cai targetColumn
                  targetColumn.cards = dndOrderedCards
                  targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)


                  return nextColumns
              })
        }
    }
  
    // xu ly keo tha column trong boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      //console.log('Hanh dong keo tha column')

    // neu vi tri sau khi keo tha khac voi vi tri ban dau
      if (active.id !== over.id) {
        // lay vi tri cu cua column tu active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // lay vi tri moi cua column tu over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        // Dung arrayMove de sap xep lai mang Columns ban dau
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns:', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds:', dndOrderedColumnsIds)
      
        // cap nhat lai stae columns ban dau sau khi keo tha
        setOrderedColumns(dndOrderedColumns)

      }
    }
    
    
    // Nhung du lieu sau khi keo tha nay luon phai dua ve gtri null mac dinh ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)

  }

  // args la cac doi so, tham so
  const collisionDetectionStrategy = useCallback((args) =>{
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
      return closestCorners({ ...args })
    }

    // Tim cac diem giao nhau, va cham -intersections voi con tro
    const pointerIntersections = pointerWithin(args)

    if(!pointerIntersections?.length) return 
    // Thuat toan phat hien va cham se tra ve mot mang cac va cham o day
    // const intersections = !!pointerIntersections?.length 
    //   ? pointerIntersections 
    //   : rectIntersection (args)
    
    // tim overId dau tien trong dam pointerIntersections o tren
    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      // DUng closestCorners de cai over la column se tim toi cardId gan nhat ben trong khu vuc va cham
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        //console.log('overId before: ', overId)
        overId = closestCorners ({ 
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container._id !== overId) && (checkColumn.cardOrderIds?.includes(container.id))
          })
        })[0]?.id 
        // console.log('overId after: ', overId)
      }

      lastOverId.current = overId
      return [{ id : overId }]
    }

    // Neu overId la null thi tra ve mang rong - tranh bug crash trang
    return lastOverId.current ? [{ id: lastOverId.current}] : []

  }, [activeDragItemType, orderedColumns])





  const customDropAnimation = {
    sideEffects:defaultDropAnimationSideEffects({style: {
      active: { opacity: '0.5' }}})
  }



  return (
  <DndContext 
      sensors={sensors}

      // collisionDetection={closestCorners}

      //Tu custom nang cao thuat toan phat hien va cham 
      collisionDetection={collisionDetectionStrategy}

      
      
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
  >
    <Box sx ={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
        
      }}>
        <ListColumns columns= {orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
       
        </DragOverlay>
      </Box>
    </DndContext>
  )
  
}

export default BoardContent