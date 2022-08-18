import spinner from './assets/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img alt='Loading...' src={spinner} width={180} />
    </div>
  )
}

export default Spinner