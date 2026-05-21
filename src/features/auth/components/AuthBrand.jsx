import primaryLogo from '@/assets/logo/primary-def.webp'

const AuthBrand = () => {
  return (
    <div className="flex items-center gap-3">
      <img alt="GreenTrust logo" className="h-9 w-9 object-contain" src={primaryLogo} />
      <div>
        <div className="text-[1.05rem] font-semibold leading-none text-[#205336]">
          GreenTrust <span className="text-[#4a4a46]">Passport</span>
        </div>
        <div className="mt-1 text-[0.56rem] font-semibold leading-none text-[#7d786f]">
          Republik Indonesia · MVP
        </div>
      </div>
    </div>
  )
}

export default AuthBrand
