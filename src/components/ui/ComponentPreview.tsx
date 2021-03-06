import * as React from 'react';
import Core from '../embercomCore';
import styled from '@emotion/styled';
import { Row } from 'emotion-box';

const Overflow = styled('div')`
  overflow: hidden;
`;

const PreviewContainer = styled('div')`
  padding: 18px;
  background: var(--gray-lightest);
  width: 100%;
  overflow: scroll;
`;

const Preview = ({ component, componentProps }: Props) => {
  let Component = Core[component];

  return <Component {...componentProps} />;
};

interface Props {
  component: string;
  componentProps: Record<string, any>;
}

export default (props: Props) => (
  <Overflow>
    <PreviewContainer>
      <Row align="center" justify="start">
        <Preview {...props} />
      </Row>
    </PreviewContainer>
  </Overflow>
);
