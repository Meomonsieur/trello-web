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

} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'

function BoardContent({board}) {

  const pointerSensor = useSensor(PointerSensor, {activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, {activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, {activationConstraint: { delay: 250, tolerance: 5 } })
  
  //const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor)


  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('Drag End:', event);
    const { active, over } = event

    // kiem tra neu khong ton tai over 
    if(!over) return

    // neu vi tri sau khi keo tha khac voi vi tri ban dau
    
    if (active.id !== over.id) {
      // lay vi tri cu cua column tu active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // lay vi tri moi cua column tu over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Dung arrayMove de sap xep lai mang Columns ban dau
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
     
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns:', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds:', dndOrderedColumnsIds)
     
      // cap nhat lai stae columns ban dau sau khi keo tha
      setOrderedColumns(dndOrderedColumns)

    }

  }
  

  return (
  <DndContext onDragEnd={handleDragEnd} sensors ={sensors} >
    <Box sx ={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
        
      }}>
        <ListColumns columns= {orderedColumns} />
      </Box>
    </DndContext>
  )
  
}

export default BoardContent