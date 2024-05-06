import { Form } from "react-router-dom";

const TransactMoney = () => {
  return (
    <div>
      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete")) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};

export default TransactMoney;
