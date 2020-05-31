import { DbAddAccount } from './db-add-account'

class EncrypterStub {
  async encrypt (value: string): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}
const makeSut = (encrypterStub: EncrypterStub): DbAddAccount => {
  return new DbAddAccount(encrypterStub)
}

describe('DbAddAccount Usecase', () => {
  test('Should call encrypter with correct password', async () => {
    const encrypterStub = new EncrypterStub()
    const sut = makeSut(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
