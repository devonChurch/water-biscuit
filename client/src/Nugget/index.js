import React from "react";
import * as urql from "urql";

const NuggetMutation = `
  mutation ($input: AddNuggetInput!) {
    addNugget (input: $input) {
      title
    }
  }
`;

export const Nugget = () => {
  const [updateTodoResult, updateTodo] = urql.useMutation(NuggetMutation);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTags((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    const nugget = {
        studyId: "999",
      title,
      content,
      tags: Object.entries(tags).filter(([key, value]) => value).map(([key]) => key),
    };
    updateTodo({ input: nugget }).then((...args) => {
      console.log("args", args);
    }).catch(error => console.error(error));
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Nugget</h1>

      <label htmlFor="123">Title</label>
      <input
        id="123"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="456">Content</label>
      <textarea
        id="456"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <fieldset>
        <legend>Tag</legend>

        <label htmlFor="789">Food</label>
        <input
          id="789"
          type="checkbox"
          name="food"
          checked={tags.food || false}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="012">Automotive</label>
        <input
          id="012"
          type="checkbox"
          name="automotive"
          checked={tags.automotive || false}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="345">Technology</label>
        <input
          id="345"
          type="checkbox"
          name="technology"
          checked={tags.technology || false}
          onChange={handleCheckboxChange}
        />

        <button type="submit">Create</button>
      </fieldset>
    </form>
  );
};
