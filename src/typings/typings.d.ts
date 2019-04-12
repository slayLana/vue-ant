declare module '@antv/data-set' {
  export class View {
    public rows: any[];
    public source(source: any, options?: any): View;
    public _prepareSource(source: any, options: any): View;
    public transform(options: any): View;
  }

  export class DataSet {
    public views: any;

    public DataSet: DataSet;

    public _getUniqueViewName(): string;
    public createView(name?: string, options?: any): View;
    public getView(name: string): string;
    public setView(name: string, view: View): void;

    public View(): any;
  }

  const dataSet: DataSet;
}

declare module 'vuedraggable' {}
