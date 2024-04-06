import './PlayArea.css';
import membaBerry from './media/images/memba.png';

function MemCardImg({ img, imgAlt }) {
    return (
        <div id="memCardImg">
            <img src={img} alt={ imgAlt } /> 
        </div>
    )
}

function MemCardTitle({ title, handleCardClick }) {
    const cardClicked = (e) => {
        // console.log(e.target);
        handleCardClick(title);
    }
    return (
        <div id="cardTitle" onClick={ cardClicked }>
            <p>{title || "Card Title"}</p>
            <img src={ membaBerry } alt="Memba Berry" />
        </div>
    )
}

function MemCard({ cardData, handleCardClick }) {
    return (
        <div id="memCard" >
            <MemCardImg img={ cardData.img } imgAlt={ cardData.imgAlt }/>
            <MemCardTitle title={ cardData.title } handleCardClick={ handleCardClick }/>
        </div>
    )
}

function PlayArea({ cardsArray, handleCardClick }) {
    return (
        <div id='playArea'>
            { cardsArray.map((card, index) => <MemCard key={ index } cardData={ card } handleCardClick={ handleCardClick }/>) }
        </div>
    )
}

export default PlayArea;