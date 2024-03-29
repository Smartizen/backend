import { Injectable, UnauthorizedException } from '@nestjs/common';
var bcrypt = require('bcryptjs');
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dto/auth.dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async getMe(email: string): Promise<any> {
    return await this.userService.findOneByEmail(email);
  }

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);

    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async signIn(SignInDto: SignInDto): Promise<any> {
    const { email, password } = SignInDto;

    const foundUser = await this.validateUser(email, password);
    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');

    const token = await this.generateToken({
      id: foundUser.id,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      gender: foundUser.gender,
      email,
      role: foundUser.role,
    });

    return {
      status: 200,
      user: {
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email,
        phonenumber: foundUser.phonenumber,
        role: foundUser.role,
      },
      token,
    };
  }

  public async signUp(signUpDto: SignUpDto): Promise<any> {
    const { firstname, lastname, email, password, gender } = signUpDto;
    // hash the password
    const hashedPass = await this.hashPassword(password);

    // create the user
    const newUser = await this.userService.create(
      firstname,
      lastname,
      email,
      hashedPass, //password
      gender,
      1, //role
    );

    // tslint:disable-next-line: no-string-literal
    // const result = newUser['dataValues'];
    // generate token
    const token = await this.generateToken({ firstname, lastname, email });

    // return the user and the token
    return {
      status: 200,
      user: {
        firstname,
        lastname,
        phonenumber: '',
        email,
      },
      token,
    };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private hashPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  private comparePassword(enteredPassword, dbPassword) {
    const match = bcrypt.compareSync(enteredPassword, dbPassword);
    return match;
  }
}
