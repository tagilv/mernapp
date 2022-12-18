// import { useState } from "react";

// const InlineEdit = ({ value, setValue }) => {
//   const [editingValue, setEditingValue] = useState(value);

//   const onChange = (event) => setEditingValue(event.target.value);

//   const onBlur = (event) => {
//     setValue(event.target.value);
//   };

//   const onKeyDown = (event) => {
//     if (event.key === "Enter" || event.key === "Escape") {
//       event.target.blur();
//     }
//   };

//   return (
//     <input
//       type="text"
//       aria-label="Field name"
//       value={editingValue}
//       onChange={onChange}
//       onKeyDown={onKeyDown}
//       onBlur={onBlur}
//     />
//   );
// };

// export default InlineEdit;
