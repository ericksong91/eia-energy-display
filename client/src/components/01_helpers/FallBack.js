import { ring } from "ldrs"

ring.register();

function FallBack() {
    return (
            <div className="min-h-screen flex items-center justify-center">
                <l-ring
                    size="40"
                    stroke="5"
                    bg-opacity="0"
                    speed="2"
                    color="black"
                ></l-ring>
            </div>
    );
};

export default FallBack;