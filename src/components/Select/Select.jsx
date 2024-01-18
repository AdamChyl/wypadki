export default function Select({ children, handleChange, currentValue, title }) {

    const handleChangeOption = (selectedOption) => {
        handleChange(selectedOption)
    };


    return (
        <div className='filter-div'>
            <p className='filrer-paragraph'>{title}:</p>
            <select
                value={currentValue}
                onChange={(e) => handleChangeOption(e.target.value)}
                className='filter-select' >
                {children}
            </select>
        </div>
    )
}