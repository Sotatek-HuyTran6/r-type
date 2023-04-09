import { Select } from 'types/form';

const regex = {
  email: new RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  ),
  number: new RegExp('^[0-9]+$'),
};

export const REQUIRE_MESSAGE = 'This field is required';
export const EMAIL_MESSAGE = 'This field expects an email';
export const NUMBER_MESSAGE = 'This field expect a number';

// fn: (...args: any[]) => any
export interface IValidator {
  error: boolean;
  message: string;
}

export class Validators {
  static email(value: any): IValidator {
    if (value) {
      const result = regex.email.test(value);
      if (!result) return { error: true, message: EMAIL_MESSAGE };
    }
    return { error: false, message: '' };
  }

  static required(value: any): IValidator {
    if (!value || !value?.toString()?.trim()?.length) {
      return { error: true, message: REQUIRE_MESSAGE };
    }
    return { error: false, message: '' };
  }

  static number(value: any): IValidator {
    const length = value ? value.toString().length : 0;

    if (length > 0) {
      const result = regex.number.test(value);
      if (!result) {
        return { error: true, message: NUMBER_MESSAGE };
      }
    }
    return { error: false, message: '' };
  }

  static getMaxLength(max: number) {
    return (value: any) => {
      if (value && value.length > max) {
        return { error: true, message: `This field is required not exceed ${max} letters` };
      }
      return { error: false, message: '' };
    };
  }
}

export class CheckBoxValidators {
  static getMinRequire(min: number) {
    return (selects: Select[]) => {
      let count = 0;
      selects.map((item, index) => {
        item.value && count++;
      });
      if (count >= min) {
        return {
          error: false,
          message: '',
        };
      } else {
        return {
          error: true,
          message: `You must select minimum ${min} options`,
        };
      }
    };
  }

  static getMaxRequire(max: number) {
    return (selects: Select[]) => {
      let count = 0;
      selects.map((item, index) => {
        item.value && count++;
      });
      if (count <= max) {
        return {
          error: false,
          message: '',
        };
      } else {
        return {
          error: true,
          message: `You must select maximum ${max} options`,
        };
      }
    };
  }

  static getExactRequire(number: number) {
    return (selects: Select[]) => {
      let count = 0;
      selects.map((item, index) => {
        item.value && count++;
      });
      if (count === number) {
        return {
          error: false,
          message: '',
        };
      } else {
        return {
          error: true,
          message: `You must select exact ${number} options`,
        };
      }
    };
  }
}
