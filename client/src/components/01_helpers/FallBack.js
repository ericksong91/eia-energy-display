import { Spinner } from "flowbite-react";

function FallBack() {
    return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size='xl' />
            </div>
    );
};

export default FallBack;