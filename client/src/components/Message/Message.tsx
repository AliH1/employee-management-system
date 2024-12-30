import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MessageType } from '../../types/types';

interface MessageProps extends MessageType {
  expand: boolean;
}

export default function Message({ title, name, message, date, expand} : MessageProps) {
  return (
    <div className='border border-white rounded-sm'>
      <Accordion defaultExpanded={expand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography component='span' sx={{ width: '50%', flexShrink: 0, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography component='span' sx={{ width: '30%', flexShrink: 0, color: 'text.secondary' }}>
             {name}
          </Typography>
          <Typography component='span' sx={{color: 'text.secondary'}}>
            {date.format('lll')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {message}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}