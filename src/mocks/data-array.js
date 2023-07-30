export const data = [
  {
    id: 1,
    title: 'list 1',
    card: [
      {
        id: 'card 1',
        title: 'card 1',
        dsecription: 'xxxxx'
      },
      {
        id: 'card 2',
        title: 'card 2',
        dsecription: 'xxxxx'
      },
      {
        id: 'card 3',
        title: 'card 3',
        dsecription: 'xxxxx'
      }
    ]
  },
  {
    id: 2,
    title: 'list 2',
    card: [
      {
        id: 'card 1 2',
        title: 'card 1 2',
        dsecription: 'xxxxx'
      }
    ]
  }
];

// drag & drop  same list
const listId = 'list-1';
const source = 0;
const destination = 2;

const listItem = data.find(item => item.id === listId);
const sourceIndex = listItem.card.find(item => item.id === source); // card source id
const cardSplice = listItem.card.splice(sourceIndex, 1)[0]; // get item array spliced
listItem.splice(destination, 1, cardSplice);

/*
- loop array -> find listId
- find card sourc index in listId
- delete & replace item in array with .splice method


*/