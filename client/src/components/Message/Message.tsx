import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { message } from '../../types/types';

interface MessageProps extends message {
  expand: boolean;
}

export default function Message({ id ,title, name, message, date, expand} : MessageProps) {
  return (
    <div className='border border-white rounded-sm'>
      <Accordion key={id} defaultExpanded={expand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" sx={{ width: '70%', flexShrink: 0, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
              By: {name}, at {date.toDateString()}
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