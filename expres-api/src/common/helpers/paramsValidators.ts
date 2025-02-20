/** returns true if is null or empty */
export const isNullOrEmpty = (value: string): boolean => {
  const isNull = value === '' || value === undefined || value === null;
  return isNull;
};
/**check if is a corret e-mail */
export const validateMail = (mail: string): boolean => {
  /* eslint-disable-next-line */
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = regex.test(mail);
  return isValid;
};
/** Convert strings as  'true', 'TRUE' , 'false', 'yes','0' and so on to boolean*/
export const parseBoolean = (stringValue: string): boolean => {
  // const bool_value = value.toLowerCase() == 'true' ? true : false;
  // return bool_value;


  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false;

    default:
      return JSON.parse(stringValue);
  }

};

export const parse_Int = (string_as_number: string, def: number = 10): number | undefined => {
  // if ((string_as_number || '').trim()) {
  //   return parseInt((string_as_number || '').trim(), 10);
  // }
  const string_as_number_parsed = string_as_number != null ? parseInt(string_as_number as string, 10) : def;
  const final_string_as_number_parsed = isNaN(string_as_number_parsed) ? def : string_as_number_parsed;
  return final_string_as_number_parsed;
}

/**
 *  Parse string to enum value
 * @param enumType 
 * @param value 
 * @returns 
 */
export const parseEnum = <T>(enumType: T, value: string): T[keyof T] | undefined => {
  const enumKey = Object.keys(enumType).find(key => key.toLowerCase() === value.toLowerCase());
  if (enumKey !== undefined) {
    return enumType[enumKey as keyof T];
  }
  return undefined;
};

// /**
//  * Parse enum value tu respective text. similar to c# Enum.GetName
//  * @param enumType 
//  * @param value 
//  * @returns 
//  */
// export const getEnumKeyFromValue = <T>(enumType: T, value: number): string | undefined => {
//   const enumKey = Object.keys(enumType).find(key => enumType[key as keyof T] === value);
//   return enumKey;
// };



/**
 * Devuelve la clave de un valor en un tipo enumerado.
 *
 * @param enumType - El tipo enumerado.
 * @param value - El valor del cual se quiere obtener la clave.
 * @returns La clave del valor en el tipo enumerado, o `undefined` si no se encuentra.
 *
 * Restricción del tipo `T`:
 * - `T extends Record<string, number>`: Esto asegura que `T` sea un objeto cuyas claves son `string` y cuyos valores son `number`, lo que se ajusta a la definición de un tipo de enumeración en TypeScript.
 *
 * Ejemplo de Uso:
 * 
 * enum MyEnum {
 *   FIRST = 1,
 *   SECOND = 2
 * }
 *
 * const key = getEnumKeyFromValue(MyEnum, 1);
 * console.log(key); // Debería imprimir "FIRST"
 */
export const getEnumKeyFromValue = <T extends Record<string, number>>(enumType: T, value: number): string | undefined => {
  const enumKey = Object.keys(enumType).find(key => enumType[key as keyof T] === value);
  return enumKey;
};
