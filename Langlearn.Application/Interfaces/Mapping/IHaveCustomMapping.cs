using AutoMapper;

namespace Langlearn.Application.Interfaces.Mapping
{
	public interface IHaveCustomMapping
	{
		void CreateMappings(Profile configuration);
	}
}
