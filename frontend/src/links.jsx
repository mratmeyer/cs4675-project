import './block-responses.css'

function Links({data}) {
    return (
        <div className="block-responses">
            <h3>Links</h3>
            <div className="items-container">
                {data["links"].map((link, index) => (
                <a key={index} href={link}>
                    <div className='block-item'>{link}</div>
                </a>
                ))}
            </div>
        </div>
    )
}

export default Links