import { UserButton } from '@stackframe/stack';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 p-5 text-center flex justify-between">
            <h1 className="text-white text-2xl">My Crud</h1>
            <UserButton />
        </header>
    );
};

export default Header;
