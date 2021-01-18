import './Loading.css';

const Loading = props =>{
    return (
        <div className={props.active ? "loader-container active" : "loader-container"} id="loader">
            
            <div className="loader-message">
                {props.message}
            </div>
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="loader-background"></div>
        </div>
    )
}
export default Loading;