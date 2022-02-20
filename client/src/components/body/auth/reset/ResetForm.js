import  Input from '../input/Input'

function ResetForm() {
  return (
    <form className="login">
        {/* Drop down prop into Input so we got */}
      <Input type="password"  text="Password"/>
      <div className="login_btn">
          <button>Reset</button>
      </div>
      </form>
  )
}

export default ResetForm
