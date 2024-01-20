import { user } from "@prisma/client";

type Props = {
    contact: user;
};

export const ContactDetails = ({ contact }: Props) => {
    return (
        <div >
            <div>
                <p>user image</p>
                <p>full name</p>
                <p>Bookmark, Message, Role Badge</p>
            </div>
            <p>add and edit options delete is under edit</p>
            <p>First Name: {contact.first_name}</p>
            <p>Last Name: {contact.last_name}</p>
            <p>Username: {contact.username}</p>
            <p>Email: {contact.email}</p>
            <p>Role: {contact.role}</p>
            <p>Phone Number: {contact.phone_number}</p>
            <p>Image URL: {contact.image_url}</p>
            <p>Birthday: {contact.birthday}</p>
            <p>Created At: {contact.created_at.toLocaleDateString()}</p>
        </div>
    );
};
