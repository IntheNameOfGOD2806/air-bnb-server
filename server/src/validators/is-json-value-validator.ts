import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import isJSON from 'validator/lib/isJSON';

@ValidatorConstraint({ name: 'isJSONValue', async: false })
export class IsJSONValue implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== 'string') {
      return false; // hoặc true nếu bạn muốn cho phép bỏ trống
    }
    return isJSON(value);
  }

  defaultMessage(): string {
    return 'This field must be a valid JSON string.';
  }
}
