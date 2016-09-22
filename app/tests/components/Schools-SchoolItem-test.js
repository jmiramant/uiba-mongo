// import React from 'react';
// import expect from 'expect';
// import { mount } from 'enzyme';
// import SchoolItem from 'components/schools/SchoolItem';
// import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

// const emptyData = [];
// const topicItemData = [{
//   text: '',
//   id: '',
//   index: 0,
//   onIncrement: () => {},
//   onDecrement: () => {},
//   onDestroy: () => {}
// }];

// const schoolItemData = {
//   profile_id: 123,
//   name: 'Josh',
//   major: ['asd', 'asdw'],
//   minor: ['asd', 'asdw'],
//   degree: 'Master',
//   startDate: new Date(),
//   endDate: new Date(),
//   current: false,
// }

// const stubFunctions = {
//   schoolChange: () => {},
//   saveSchoolEdit: () => {},
//   handleDelete: () => {}
// };

// describe('<SchoolItem />', () => {
//   describe('With School', () => {
//     it('should render list items', () => {
//       expect(mount(<SchoolItem school={schoolItemData} {...stubFunctions} />).find(EditIcon).length).toBe(1);
//     });
//   });

//   // describe('Without School', () => {
//   //   it('should not render <TopicItem> list items', () => {
//   //     expect(mount(<MainSection topics={emptyData} {...stubFunctions} />).find(TopicItem).length).toBe(0);
//   //   });
//   // });
// });

