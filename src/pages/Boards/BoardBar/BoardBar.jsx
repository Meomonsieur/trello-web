import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon  from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { capitalizeFirstLetter } from '~/utils/formatters';

const MENU_StYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  fontWeight: 'bold',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white', 
  },
  '&:hover': {
    backgroundColor: 'primary.50',
    border: 'none',
  },

}
function BoardBar({board}) {
  
  return (
    <Box sx ={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e': '#1976d2'),

      }}>
        <Box sx ={{ display: 'flex', alignItems: 'center', gap: 2}}>
          <Chip
          sx ={MENU_StYLES} 
          icon={<DashboardIcon />} 
          label={board?.title}
          clickable
          />

          <Chip
          sx ={MENU_StYLES} 
          icon={<VpnLockIcon />} 
          label={capitalizeFirstLetter(board?.type)}
          clickable
          />

          <Chip
          sx ={MENU_StYLES} 
          icon={<AddToDriveIcon />} 
          label="Add To Google Drive" clickable/>
        
        <Chip
          sx ={MENU_StYLES} 
          icon={<BoltIcon />} 
          label="Automation" clickable/>
        
        <Chip
          sx ={MENU_StYLES} 
          icon={<FilterListIcon />} 
          label="Filters" clickable/>
        
        
        </Box>

        <Box sx ={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <Button 
          variant='outlined' 
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: 'primary.50',
              borderColor: 'white',
            },
          }}
          >
            Invite
        </Button>
        <AvatarGroup 
        max={4} 
        sx={{
          gap: '10px',
          '& .MuiAvatar-root': {
          width: 34,
          height: 34,
          fontSize: 16,
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          '&:first-of-type': { bgcolor: '#a4b0be' },
        }
        }}>
          <Tooltip title="quanphan">
            <Avatar 
              sx ={{width: 30, height: 30}}
              alt="quanphan" 
              src="https://yt3.ggpht.com/yti/ANjgQV9QlgCWugCCyNA6gN_6NyYmavWqxmzm0QKb3URqtlA=s88-c-k-c0x00ffffff-no-rj" 
            />
          </Tooltip>
          <Tooltip title="quanphan">
            <Avatar 
              sx ={{width: 30, height: 30}}
              alt="quanphan" 
              src="https://yt3.ggpht.com/yti/ANjgQV9QlgCWugCCyNA6gN_6NyYmavWqxmzm0QKb3URqtlA=s88-c-k-c0x00ffffff-no-rj" 
            />
          </Tooltip>
          <Tooltip title="quanphan">
            <Avatar 
              sx ={{width: 30, height: 30}}
              alt="quanphan" 
              src="https://yt3.ggpht.com/yti/ANjgQV9QlgCWugCCyNA6gN_6NyYmavWqxmzm0QKb3URqtlA=s88-c-k-c0x00ffffff-no-rj" 
            />
          </Tooltip>
          <Tooltip title="quanphan">
            <Avatar 
              sx ={{width: 30, height: 30}}
              alt="quanphan" 
              src="https://yt3.ggpht.com/yti/ANjgQV9QlgCWugCCyNA6gN_6NyYmavWqxmzm0QKb3URqtlA=s88-c-k-c0x00ffffff-no-rj" 
            />
          </Tooltip>
          <Tooltip title="quanphan">
            <Avatar 
              sx ={{width: 30, height: 30}}
              alt="quanphan" 
              src="https://yt3.ggpht.com/yti/ANjgQV9QlgCWugCCyNA6gN_6NyYmavWqxmzm0QKb3URqtlA=s88-c-k-c0x00ffffff-no-rj" 
            />
          </Tooltip>

        </AvatarGroup>
        </Box>   
  
      </Box>
  )
}

export default BoardBar

