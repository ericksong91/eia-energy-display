import { ring2 } from "ldrs";

ring2.register();

function LoadingFallBack() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <l-ring-2
                size="50"
                stroke="6"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#35585F"
            ></l-ring-2>
        </div>
    );
};

export default LoadingFallBack;