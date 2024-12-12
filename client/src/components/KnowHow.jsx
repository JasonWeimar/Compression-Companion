
const KnowHow = () => {
    const faqs = [
        {
            question: "When counting clicks, where do you start?",
            answer: "Start by turning the dial all the way clockwise until it stops. This is the starting point (zero clicks). Then, turn the dial counter-clockwise, counting each click as you go."
        },
        {
            question: "What is the correct tire pressure for mountain biking?",
            answer: "Tire pressure can vary depending on terrain, rider weight, and personal preference. Generally, 20-30 psi is a good starting point for mountain biking."
        },
        {
            question: "How do I measure sag on my bike?",
            answer: "To measure sag, sit on your bike in a neutral riding position with your feet off the ground. Measure the distance from a fixed point on the bike to the ground with and without the rider. The difference is your sag."
        }
    ];

    return (
        <>
            <div className="knowHowBodyContainer">
                <h3>Know-How (FAQ)</h3>
                <div className="faqContainer">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faqCard">
                            <h4 className="faqQuestion">{faq.question}</h4>
                            <p className="faqAnswer">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default KnowHow;