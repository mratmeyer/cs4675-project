function Events({data}) {
    return (
        <div className="block-responses">
            <h3>Events</h3>
            <div className="items-container">
                {data["events"].map((event, index) => (
                <div key={index} className='block-item' >{event}</div>
                ))}
            </div>
        </div>
    )
}

export default Events