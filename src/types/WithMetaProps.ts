import { RouteComponentProps } from 'react-router';

export default interface WithMetaProps extends RouteComponentProps {
  meta: {
    title: string
  }
}