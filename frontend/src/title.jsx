import {useNavigate} from 'react-router-dom'
import './title.css'

function Title({results}) {
    const navigate = useNavigate();

    const handleLogoCLick = () => {
        navigate('/')
    }

    return (
        <div className={`logo-container${results ? '-results': ''}`} onClick={handleLogoCLick}>
            <div className={`logo${results ? '-results': ''}`}>
            <span style={{ color: '#4285f4' }}>A</span>
            <span style={{ color: '#ea4335' }}>s</span>
            <span style={{ color: '#fbbc05' }}>k</span>
            <span className="space" />
            <span style={{ color: '#4285f4' }}>B</span>
            <span style={{ color: '#34a853' }}>u</span>
            <span style={{ color: '#ea4335' }}>z</span>
            <span style={{ color: '#fbbc05' }}>z</span>
            </div>
        </div>
    )
}

export default Title