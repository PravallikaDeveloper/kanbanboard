'use client';

import Header from "./header/header";
import KanbanBoard from "./kanban/page";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <KanbanBoard></KanbanBoard>
    </div>
  );
}
