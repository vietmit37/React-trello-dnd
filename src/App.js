
import React, { useState } from 'react';
import { Avatar, Tooltip, Button, Modal, Input, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// components
import TrelloList from './components/TrelloList';

// mock data
import  { data } from './mocks/data'

const { TextArea } = Input;
const { Option } = Select;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [todos, setTodos] = React.useState(data);

  const handleSubmit = (values) => {
    console.log('values: ', values)

    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  function handleViewDetail() {
    Modal.info({
      title: 'Card Detail',
      content: (
        <>
          <div>
            <h4>Title</h4>
            <div>This is title</div>
          </div>
          <br />
          <div>
            <h4>Description</h4>
            <div>This is description</div>
          </div>
          <br />
          <div>
            <h4>Member</h4>
            <div>
              <Avatar.Group>
                <Tooltip title="Tony Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
                <Tooltip title="Phuong Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
              </Avatar.Group>
            </div>
          </div>
          <br />
          <div>
            <h4>Status</h4>
            <div>New</div>
          </div>
        </>
      ),
      onOk() {},
    });
  }

  // using useCallback is optional
  const onDragEnd = (result) => {
    console.log('onDragEnd: ', result)
    const { type, source, destination } = result;

    // 4. nothing
    if(!destination) {
      alert('Not happend!');
      return
    }

    // drag & drop list
    if(type === 'LIST'){
      // something logic
      
      return;
    }
    
    // CARD
    // 1. drag & drop card same list
    if(source.droppableId === destination.droppableId) {
      // code logic default moving card
      // const listId = destination.droppableId;
      // const listItem = todos.lists[listId]
      // const cardItem = listItem.cards.splice(source.index, 1)[0]; // get cardItem cut
      // listItem.cards.splice(destination.index, 0, cardItem); // add item;

      // setTodos(prevState => ({
      //   ...prevState,
      //   lists: {
      //     ...prevState.lists,
      //     [listId]: {
      //       ...prevState.lists[listId],
      //       cards: listItem.cards
      //     }
      //   }
      // }))

      // code logic swap item
      const listId = destination.droppableId;
      const listItem = todos.lists[listId]
      const cards = listItem.cards;
      [cards[source.index], cards[destination.index]] = [cards[destination.index], cards[source.index]];

      setTodos(prevState => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [listId]: {
            ...prevState.lists[listId],
            cards: cards
          }
        }
      }))
      
      return;
    }

    // 2. drag & drop card between lists

    
    
    
  };

  console.log("todos: ", todos)

  return (
    <>
      <header>
        <div class="header__container">
          <div class="header__logo" />  
            <div class="header__right">
              <div class="header__avatar">
                <img src="/assets/images/avatar.png" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <DragDropContext
              onDragEnd={onDragEnd}
            >
              <Droppable droppableId="all-lists" direction='horizontal' type="LIST">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                    {...provided.droppableProps}
                    className='listContainer'
                  >
                    {todos.columns.map((listId, listIndex) => {
                      const listItem = todos.lists[listId];
                      const cards = listItem.cards.map(cardId => todos.cards[cardId]);
                      return (
                        <TrelloList 
                          key={listItem.id}
                          index={listIndex}
                          listItem={listItem}
                          cards={cards}
                        />
                      )
                    })}

                    {provided.placeholder}

                    <Button type="text"><PlusOutlined /> Add another list</Button>

                  </div>
                )}
                
              </Droppable>
            </DragDropContext>
            
          </div>
        </main>

        <Modal
          title="Add Card"
          open={open}
          onOk={form.submit}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          <br />
          <Form
            name="basic"
            form={form}
            initialValues={{ status: 'new' }}
            onFinish={handleSubmit}
            autoComplete="off"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            wrapperCol={{ flex: 1 }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Member"
              name="member"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                optionLabelProp="label"
                onChange={handleChange}
              >
                <Option value="tony123" label="tony 123">
                  <div className="selectField">
                    <Avatar src="https://picsum.photos/id/237/200/300" />
                    <span>Tony Nguyen</span>
                  </div>
                </Option>
                <Option value="phuong123" label="phuong 123">
                  <div className="selectField">
                    <Avatar src="https://picsum.photos/id/237/200/300" />
                    <span>Phuong Nguyen</span>
                  </div>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
            >
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: 'new',
                    label: 'New',
                  },
                  {
                    value: 'inprocess',
                    label: 'In process',
                  },
                  {
                    value: 'done',
                    label: 'Done',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
}

export default App;
