import { useState, useEffect } from 'react';
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

//import {mockData} from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis';

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6868f6b72c95a57bf2caf7f8'
    // call api
    fetchBoardDetailsAPI(boardId).then (board => {
      setBoard(board)
    })
  }, [])

   return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />

    </Container>

  )
}

export default Board