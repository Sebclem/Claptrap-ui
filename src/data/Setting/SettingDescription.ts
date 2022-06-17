type SettingDescrition = {
  name: string;
  mainField: FieldDescriptor;
  fields: FieldDescriptor[];
};

type FieldDescriptor = {
  id: string;
  name: string;
  description: string;
  type: string;
};

export type { SettingDescrition, FieldDescriptor };
