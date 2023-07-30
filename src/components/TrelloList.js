import React from 'react'
import {  Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Tooltip, Button, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// components
import TrelloCard from './TrelloCard';


function TrelloList({ index, listItem, cards }) {
  return (
    <Draggable draggableId={String(listItem.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={String(listItem.id)} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                 <Card title={listItem.title}
                  className="cardList"
                  extra={
                    <>
                      <Tooltip title="Add a card">
                        <Button shape="circle" icon={<PlusOutlined />} onClick={() => {}} />
                      </Tooltip>

                      <Popconfirm
                        title="Delete the list"
                        description="Are you sure to delete this list?"
                        onConfirm={() => {}}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                        className="ml-10"
                      >
                        <Tooltip title="Delete this list">
                          <Button shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                      </Popconfirm>
                    </>
                  } 
                >
                  {cards.map((card, cardIndex) => (
                    <TrelloCard 
                      key={card.id}
                      index={cardIndex}
                      card={card}
                    />

                  ))}
                </Card>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default TrelloList