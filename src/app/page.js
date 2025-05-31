// app/page.jsx
import { redirect } from 'next/navigation';

export default function App() {
  redirect('/auth/login'); // akan redirect saat server render
}
