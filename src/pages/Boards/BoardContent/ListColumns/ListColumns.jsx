import Box from '@mui/material/Box'
import { useState } from 'react'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns }) {
    const [openNewColumnForm, setOpenNewColumnForm]= useState(false)
    const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
    
    const [newColumnTitle, setNewColumnTitle] = useState('')
    const addNewColumn = () => {
        if (!newColumnTitle) {
            return
        }
        toggleNewColumnForm()
        setNewColumnTitle('')
    }

    return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
        <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
            }}>
            {columns?.map(column => (
                <Column key={column._id} column={column} />
            ))}

    
            {/* Box add new column */}
            {!openNewColumnForm 
            ? <Box onclick ={toggleNewColumnForm} sx={{
                    minWidth: '250px',
                    maxWidth: '250px',
                    mx: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d'
                }}>
                    <Button startIcon={<NoteAddIcon />} 
                    sx={{color:'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1}}>
                    Add new column
                    </Button>
                </Box>
            : <Box sx={{
                minWidth: '250px',
                maxWidth: '250px',
                mx: 2,
                p: 1,
                borderRadius: '6px',
                height: 'fit-content',
                bgcolor: '#ffffff3d',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
                }}> 
                <TextField  
                    label="Enter column title..." 
                    type="text" 
                    size="small" 
                    variant='outlined'
                    autoFocus
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    
                    sx={{
                    '& label': {
                        color: 'white'
                    },
                    '& input': {
                        color: 'white'
                    },
                    '& label.Mui-focused': {
                        color: 'white'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                        borderColor: 'white',
                        },
                        '&:hover fieldset': {
                        borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                        borderColor: 'white',
                        }
                    },
                    }}/>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> 
                    <Button
                        onclick={addNewColumn}
                        variant='contained' color='success' size='small'
                        sx={{
                            boxShadow: 'none',
                            border: '0.5',
                            borderColor: (theme) => theme.palette.success.main,
                            '&:hover': {
                                bgcolor: (theme)=> theme.palette.success.main,
                            },
                        }}
                    >
                        Add column</Button>
                    <CloseIcon fontSize='small' 
                    sx={{ 
                        color: 'while',
                        cursor: 'pointer',
                        '&:hover': {
                            color: (theme)=> theme.palette.warning.light,
                            }, 
                        }}
                      onClick={ toggleNewColumnForm }
                    />
                </Box>
            </Box>
            }
                
        </Box>
    </SortableContext>
  )
}

export default ListColumns