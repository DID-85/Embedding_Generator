// app/routes/index.tsx
import { redirect } from '@remix-run/node';

export const loader = () => {
  return redirect("/user-guide"); // Or any default page
};