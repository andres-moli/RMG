import { EntityRepository, Repository } from 'typeorm';
import { StatisticCards } from '../entity/statistic-cards'; // Asegúrate de tener la ruta correcta
import { TotalSalesByCompany } from '../entity/TotalSalesByCompany';
import { TotalAppointmentsByStatusPerCompany } from '../entity/status-cita';
import { StockProductView } from '../entity/stock-products';
import { EstadoFinancieroView } from '../entity/cards-saldo-contabilidad';

@EntityRepository(StatisticCards)
export class StatisticCardsRepository extends Repository<StatisticCards> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

@EntityRepository(TotalSalesByCompany)
export class TotalSalesByCompanyRepository extends Repository<TotalSalesByCompany> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

@EntityRepository(TotalAppointmentsByStatusPerCompany)
export class TotalAppointmentsByStatusPerCompanyRepository extends Repository<TotalAppointmentsByStatusPerCompany> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

@EntityRepository(StockProductView)
export class StockProductViewRepository extends Repository<StockProductView> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

@EntityRepository(EstadoFinancieroView)
export class EstadoFinancieroViewRepository extends Repository<EstadoFinancieroView> {
    // Aquí puedes agregar métodos personalizados si es necesario
}
