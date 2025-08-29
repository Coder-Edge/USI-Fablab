
export interface User {
    id: (string | null);
    name: string;
    email: string;
    userType: (string | null);
}

export const Role: { [key: string]: string } = {
    student: "Student",
    manager: "Manager",
    extern: "Extern",
    member: "Member",
}