import styled from 'styled-components'
const CurrentPage = styled.div`
	&.not-defined{
		img{
			width: 100%;
      margin-top: 18%;
		}
		.content {
			padding: 0 1rem;
			text-align: center;
			color: #44405e;
			font-size: 15px;
		}
		.title {
			margin-bottom: 0.6rem;
			color: #302c48;
			font-size: 20px;
		}

		.btn {
			color: #fff;
			background-color: #ef4c4c;
			font-size: 16px;
			padding: 0.16rem;
			border-radius: 25px;
			text-align: center;
			width: 2.4rem;
			margin: 0 auto;
			margin-top: 1rem;
		}
	}
`
export default CurrentPage
