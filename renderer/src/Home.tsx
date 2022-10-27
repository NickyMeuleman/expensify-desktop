import { trpc } from "./utils/trpc";

function Home() {
  const examples = trpc.example.getAll.useQuery();
  const utils = trpc.useContext();
  const addExample = trpc.example.add.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    },
  });
  const removeExample = trpc.example.remove.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    },
  });
  const greeting = trpc.greeting.useQuery({ name: "Nicky" });

  return (
    <div>
      <h1 className="text-3xl font-bold underline m-10 text-red-500">Hello worlds!</h1>
      <p>{greeting.data}</p>
      <button onClick={() => addExample.mutate()}>ADD example</button>
      <ul>
        {examples.data?.map((example, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                removeExample.mutate({ id: example.id });
              }}
            >
              <span>{example.id}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
