import Button from "../Button/Button";
import WhoAndWhencard from "./WhoAndWhencard/WhoAndWhencard";

export default function WhoAndWhenComp({ cards,heading,onClick }) {
    return (
        <div className="p-4">
            <div className="flex justify-center text-2xl sm:text-3xl lg:text-4xl font-medium pt-12 sm:pt-16 lg:pt-36">
            {heading}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 pt-8 sm:pt-16 lg:pt-28">
                {cards.map((card, index) => (
                    <WhoAndWhencard
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-20 text-center">
            Not sure about your eligibility? Connect with our experts for better clarity.
            </div>
            <div className="flex justify-center mt-5">
            <Button variant="outline" onClick={onClick}>Conatct us</Button>
            </div>
        </div>
    );
}
