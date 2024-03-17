// Types and Interfaces

interface User {
  id: string | undefined;
  email: string;
}
interface Job {
  date: string;
  title: string;
  company: {
    name: string;
  };
  id: string;
}
