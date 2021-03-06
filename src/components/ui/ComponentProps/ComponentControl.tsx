import * as React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '../Button';
import PropertyControl from './PropertyControl';
import Cell from './Cell';
import Label from './Label';
import { Row } from 'emotion-box';

const Table = styled('table')`
  width: 100%;
  border-spacing: 8px;
`;

interface ComponentRowProps {
  last?: boolean;
}

const ComponentRow = styled('tr')<ComponentRowProps>`
  *:last-of-type td {
    padding-bottom: 0;
  }
`;

const ComponentCell = styled(Cell)`
  border: 1px solid var(--gray-light);
  border-radius: 4px;
`;

interface Props {
  type: string;
  value: any[];
  options: any;
  onChange: any;
  label: string;
  availablePropsForKey: any;
}

const removeLastComponentFromList = (list, onChange) =>
  onChange([...list.filter((_, i) => i + 1 !== list.length)]);

const addNewComponentToList = (list, newComponent, onChange) =>
  onChange([...list, newComponent]);

const updateComponentPropertyValue = ({
  components,
  componentIndex,
  propertyKey,
  onChange,
}) => propertyValue => {
  components[componentIndex] = {
    ...components[componentIndex],
    [propertyKey]: propertyValue,
  };

  return onChange(components);
};

const ComponentControlHeader = ({
  label,
  value,
  onChange,
  newComponent,
  type,
}) => (
  <tr key={type}>
    <Cell colSpan={2}>
      <Row justify="space-between">
        <Label disabled={false}>{label}:</Label>

        <Row inline>
          <IconButton
            onClick={() => removeLastComponentFromList(value, onChange)}
          >
            -
          </IconButton>

          <IconButton
            onClick={() => addNewComponentToList(value, newComponent, onChange)}
          >
            +
          </IconButton>
        </Row>
      </Row>
    </Cell>
  </tr>
);

export default ({
  type,
  value,
  options,
  onChange,
  label,
  availablePropsForKey,
}: Props) => {
  return (
    <>
      <ComponentControlHeader
        type={type}
        value={value}
        newComponent={availablePropsForKey.newComponent}
        label={label}
        onChange={onChange}
      />

      {value.map((component, componentIndex) => (
        <ComponentRow
          last={value.length === componentIndex + 1}
          key={componentIndex}
        >
          <ComponentCell colSpan={2}>
            <Table>
              <tbody>
                {Object.keys(options).map((prop, optionIndex) => {
                  const disabled =
                    options[prop].disabledWhen &&
                    options[prop].disabledWhen(component);

                  const componentOptions =
                    options[prop].options && options[prop].options(component);

                  return (
                    <PropertyControl
                      type={options[prop].type}
                      key={optionIndex}
                      label={options[prop].label}
                      value={component[prop]}
                      options={componentOptions}
                      onChange={updateComponentPropertyValue({
                        components: [...value],
                        componentIndex: componentIndex,
                        propertyKey: prop,
                        onChange,
                      })}
                      disabled={disabled}
                    />
                  );
                })}
              </tbody>
            </Table>
          </ComponentCell>
        </ComponentRow>
      ))}
    </>
  );
};
