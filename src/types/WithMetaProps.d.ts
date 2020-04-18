import { RouteComponentProps } from 'react-router';

declare interface WithMetaProps extends RouteComponentProps {
  meta: {
    title: string
  }
}
