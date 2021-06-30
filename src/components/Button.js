import React from 'react';

function Button({ content, id, handleClick, classes }) {
	return (
		<button className={`btn ${classes}`} id={id} onClick={() => handleClick(content)}>
			{content}
		</button>
	);
}

export default Button;
