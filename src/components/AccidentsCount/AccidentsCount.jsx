export default function AccidentsCount({ accidentsCount, isAllDate }) {

    let classDiv;

    if (isAllDate) {
        classDiv = 'AccidentsCountDivMobile';
    } else {
        classDiv = 'AccidentsCountDiv';
    }

    return (
        <div className={classDiv}>
            <p className='AccidentsCountText'>Liczba wypadków: <b>{accidentsCount}</b></p>
        </div>
    );
}