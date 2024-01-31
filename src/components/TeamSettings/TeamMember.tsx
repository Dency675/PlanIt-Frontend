import { Avatar, Button, ButtonGroup, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const TeamMember = () => {
  return (
    <ListItem>    
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm" textColor={'black'}>Dencymol Baby</Typography>
            <Typography level="body-xs" noWrap>
              Project Manager
            </Typography>
          </ListItemContent>
          <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
            <Button disabled>Make Scrum Master</Button>
            <Button>Remove</Button>
          </ButtonGroup>
        </ListItem>   
  )
}

export default TeamMember