export default function Header({ children, position }) {

    const headerStyle = {
        position: 'absolutem',
        top: '2rem'
    };

    if (position === 'left') {
        headerStyle.left = '2rem';
    } else if (position === 'right') {
        headerStyle.right = '2rem';
    }

    return (
        <div id="header" style={headerStyle}>
            <h2 className='title'>
                {children}
            </h2>
        </div>
    );
}