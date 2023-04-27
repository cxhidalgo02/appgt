# Aplicación para Gestión de Tutorias

La aplicación multiplataforma esta desarrollada en React Native conjuntamente con JavaScript utilizando algunos servicios que nos ofrece Firbase, como es autenticacion, una base de datos NoSQL, notificaciones, etc.

Esta aplicación esta desarrollada para los docentes y estudiantes de la universidad, la misma permitirá el control y gestión de las tutorias presenciales de manera mas eficiente. 

## MÓDULOS DE LA APLICACIÓN

### REGISTRO DE USUARIOS
El registro de usuarios se lo hace mediante un formulario utilizando los servicios de Firbase para el alamacenamiento de la informacioón, en este apartado se registra como Docente o Estudiante.

### INICIO DE SESIÓN
El inicio de sesión de se lo realiza con el usuario, contraseña y tipo, la autenticacion se la realizacon el servicio de Firbase.

### REGISTRO DE ASIGNATURAS
El docente crea la asignatura para poder registrar las tutorias en la misma.

### REGISTRO DE TUTORIAS
El docente crea las tutorias correspondente a cada asignatura.

### REGISTRO DEL ESTUDIANTE EN LA ASIGNATURA
El estudiante mediante el codigo de la asignatura que brinda el docente se registra y espera el acceso a la asignatura.

### VALIDAR ACCESO A LA ASIGNATURA
El docente valida el acceso a los estudiantes que corresponden a la asignatura para la visualizacion de las tutorias.

### INSCRIPCIÓN EN EL TEMA DE TUTORIA
El eestudiante una vez que visualice las tutorias podrá inscribirse o confirmar la asistencia a la tutoria.

### VALIDAR ASISTENCIA DE TUTORIAS
El docente validará la asistencia de todos los estudiantes que se inscribieron y asistieron a las tutorias de la asignatura.

### GENERAR REPORTE DE ASISTENCIA A TUTORIAS
El docente o estudiante podra generar un reporte de asistencias a las tutorias, vuzualizar a cuantas tutorias se inscribieron, cuantas fueron validadas, número total de tutorias, etc.
